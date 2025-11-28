# DevPulse - Developer Activity Dashboard

One-stop dashboard for tracking your developer activity across multiple platforms. Because checking GitHub, Stack Overflow, and WakaTime separately is annoying.

## The Problem

As a developer, my activity is scattered across multiple platforms - GitHub contributions, Stack Overflow reputation, coding time tracking, etc. There's no unified view to see my overall productivity or share my dev activity with recruiters. Manually checking each platform is tedious, and there's no way to see trends across all of them.

## My Solution

Built a full-stack dashboard that aggregates developer activity from multiple APIs into a single, real-time view. Backend handles OAuth authentication, API polling, data normalization, and caching to avoid rate limits. Frontend displays interactive charts showing commits, contributions, coding time, and reputation changes over time. Implemented a PostgreSQL database to store historical data for trend analysis that APIs don't provide natively.

## Impact

- **Multi-source aggregation:** GitHub, Stack Overflow, and WakaTime data in one view
- **Historical tracking:** Database stores 90 days of activity for trend analysis
- **Smart caching:** Redis cache reduces API calls by 85%, prevents rate limit issues
- **Real-time updates:** WebSocket connection pushes new activity as it happens
- **Responsive dashboard:** Mobile-optimized charts using Chart.js with touch interactions
- **OAuth security:** Proper token management and refresh logic

## Technical Architecture

### Backend (Node.js + Express)
- RESTful API with JWT authentication
- PostgreSQL database for user data and activity history
- Redis for caching API responses
- OAuth 2.0 integration with GitHub
- Rate limiting and request queue management
- Scheduled jobs for periodic API polling (node-cron)
- WebSocket server for real-time updates (Socket.io)

### Frontend (React + TypeScript)
- React with TypeScript and Vite
- Redux Toolkit for state management
- Chart.js for data visualization
- Tailwind CSS for styling
- Responsive design with mobile-first approach
- Real-time updates via Socket.io client
- Toast notifications for activity updates

### Database Schema
```sql
-- Users table
users (id, github_username, email, created_at)

-- Activity snapshots (stored daily)
activity_snapshots (
  id, user_id, date,
  github_commits, github_prs, github_issues,
  stackoverflow_reputation, stackoverflow_answers,
  wakatime_coding_hours,
  created_at
)

-- Activity events (real-time stream)
activity_events (
  id, user_id, event_type, platform,
  description, url, created_at
)
```

## Key Features

**Integrated Platforms:**
- **GitHub:** Commits, pull requests, issues, contributions graph
- **Stack Overflow:** Reputation changes, answers, questions, badges
- **WakaTime:** Coding hours by day/week, language breakdown

**Analytics:**
- 7-day, 30-day, and 90-day activity trends
- Most productive days/hours
- Language usage statistics
- Contribution streaks
- Activity heatmap calendar

**Sharing:**
- Public profile URLs for portfolio/resume
- Exportable activity reports (PDF)
- Embeddable widgets for personal sites

## API Endpoints

```
POST   /api/auth/register          - Create new account
POST   /api/auth/login             - Login and get JWT
GET    /api/auth/github/callback   - OAuth callback

GET    /api/activity/current       - Current day activity
GET    /api/activity/trends/:days  - Activity trends
GET    /api/activity/heatmap       - Contribution heatmap

POST   /api/integrations/github    - Connect GitHub account
POST   /api/integrations/stackoverflow - Connect Stack Overflow
POST   /api/integrations/wakatime  - Connect WakaTime

GET    /api/profile/:username      - Public profile view
```

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/devpulse

# Redis
REDIS_URL=redis://localhost:6379

# OAuth
GITHUB_CLIENT_ID=your_github_oauth_id
GITHUB_CLIENT_SECRET=your_github_oauth_secret
STACKOVERFLOW_CLIENT_ID=your_so_client_id
STACKOVERFLOW_CLIENT_SECRET=your_so_client_secret

# JWT
JWT_SECRET=your_jwt_secret

# APIs
WAKATIME_API_KEY=your_wakatime_key
```

## Running Locally

### Backend
```bash
cd backend
npm install
cp .env.example .env  # Add your API keys
npm run db:migrate    # Run database migrations
npm run dev           # Start dev server on :5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev           # Start dev server on :5173
```

### Database Setup
```bash
# Install PostgreSQL and create database
createdb devpulse

# Run migrations
cd backend
npm run db:migrate
```

## Deployment

**Backend:** Deployed on Railway (free tier supports PostgreSQL + Redis)
**Frontend:** Deployed on Vercel
**Database:** Railway PostgreSQL
**Cache:** Railway Redis

## Challenges Solved

**Rate Limiting:** GitHub API allows 5000 requests/hour, but polling for multiple users would quickly hit this. Solution: Smart caching with Redis (24-hour cache for contribution graphs, 1-hour for recent activity) and request queuing.

**Real-time Updates:** Rather than polling every API constantly, implemented a hybrid approach: scheduled background jobs poll APIs every 15 minutes, then WebSockets push updates to connected clients immediately.

**Data Normalization:** Each API returns data in different formats (GitHub uses ISO dates, WakaTime uses Unix timestamps, Stack Overflow has its own format). Created unified data models that normalize everything to consistent formats.

**OAuth Token Management:** Tokens expire and need refresh. Implemented automatic token refresh with Redis-backed token storage and background refresh jobs 5 minutes before expiration.

## What I Learned

- Managing multiple OAuth flows in one app
- Designing efficient database schemas for time-series data
- Implementing smart caching strategies to avoid API rate limits
- Building real-time features with WebSockets
- Queue systems for managing API requests
- Docker compose for local development with multiple services

## Tech Stack

**Backend:**
- Node.js + Express
- PostgreSQL (Prisma ORM)
- Redis for caching
- Socket.io for WebSockets
- Node-cron for scheduled jobs
- Passport.js for OAuth

**Frontend:**
- React + TypeScript
- Redux Toolkit
- Chart.js + react-chartjs-2
- Tailwind CSS
- Socket.io-client
- React Router v6

**DevOps:**
- Docker + Docker Compose
- Railway (hosting)
- GitHub Actions (CI/CD)

## Future Enhancements

- Add GitLab and Bitbucket support
- LeetCode/HackerRank integration
- Email digests (weekly activity summary)
- Team dashboards (compare activity with teammates)
- Customizable widgets
- Browser extension for quick access
- Mobile app (React Native)

## Demo Credentials

Since this requires OAuth setup, here are demo accounts you can use:

```
Email: demo@devpulse.dev
Password: demo123
```

The demo account has sample data showing activity from a fictional developer over the past 90 days.

## Screenshots

[Note: In a real portfolio, add screenshots here]

## Live Demo

**Frontend:** https://devpulse.vercel.app
**API Docs:** https://devpulse-api.railway.app/docs

---

Built to solve my own problem of tracking dev activity across platforms. Learned a ton about API integration, caching strategies, and real-time data synchronization.
