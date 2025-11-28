# SoundCircle - Collaborative Playlist Builder

Real-time collaborative playlist builder for friend groups. Create a room, invite friends, everyone adds songs, vote on what plays next. Like a democratic DJ booth.

## The Problem

Planning music for gatherings (parties, road trips, study sessions) is annoying. One person controls the playlist while everyone else shouts suggestions. Sharing Spotify collaborative playlists requires everyone to have Spotify and know how to use it. There's no good way to:
- Let everyone add songs in real-time without sharing credentials
- Vote on what should play next
- See who added what song
- Prevent someone from adding 50 songs and dominating the queue
- Handle mixed music services (Spotify, YouTube Music, Apple Music users)

## My Solution

Built a real-time collaborative music room system. Users create a "circle" (room) and get a shareable link. Anyone with the link can join, search for songs via Spotify API, and add them to the queue. WebSocket server broadcasts all changes instantly (song added, vote cast, track playing). Implemented voting system where songs with more votes play sooner. Backend manages playback queue and song metadata. No accounts required - just join and start adding music.

## Impact

- **Real-time collaboration:** WebSocket broadcasts, all users see changes instantly
- **Democratic voting:** Songs play in order of votes, not submission time
- **No auth required:** Share room link, anyone can join (with optional password)
- **Spotify integration:** Search 50M+ songs, see album art, preview tracks
- **Room limits:** Configurable max songs per user (prevent spam)
- **Playback sync:** All users see current song, progress bar, and upcoming tracks
- **Mobile optimized:** Touch-friendly interface, works great on phones at parties

## Technical Architecture

### Backend (Node.js + Express + Socket.IO)
- Express REST API for room management
- Socket.IO for real-time features
- PostgreSQL for persistent data (rooms, songs, votes)
- Redis for active room caching
- Spotify Web API integration
- Room cleanup job (delete inactive rooms after 24 hours)
- Rate limiting per room to prevent abuse

### Frontend (Vue.js + TypeScript)
- Vue 3 with Composition API
- TypeScript for type safety
- Socket.IO client for real-time updates
- Vuex for state management
- Spotify Web Playback SDK for in-browser playback (Premium users)
- Howler.js for song preview playback
- Tailwind CSS + DaisyUI components
- Progressive Web App (installable)

### Database Schema

```sql
-- Rooms (circles)
CREATE TABLE rooms (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(6) UNIQUE NOT NULL, -- 6-char join code
  password_hash VARCHAR(255),
  creator_session_id VARCHAR(100),
  max_songs_per_user INTEGER DEFAULT 5,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  last_activity_at TIMESTAMP DEFAULT NOW()
);

-- Songs in queue
CREATE TABLE queue_songs (
  id UUID PRIMARY KEY,
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  spotify_track_id VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  artist VARCHAR(255) NOT NULL,
  album VARCHAR(255),
  album_art_url TEXT,
  preview_url TEXT,
  duration_ms INTEGER,
  added_by_user VARCHAR(50), -- anonymous identifier
  votes INTEGER DEFAULT 0,
  played BOOLEAN DEFAULT false,
  added_at TIMESTAMP DEFAULT NOW()
);

-- Votes
CREATE TABLE votes (
  id UUID PRIMARY KEY,
  song_id UUID REFERENCES queue_songs(id) ON DELETE CASCADE,
  user_session_id VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(song_id, user_session_id)
);

-- User sessions (track active users per room)
CREATE TABLE user_sessions (
  id UUID PRIMARY KEY,
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  session_id VARCHAR(100) NOT NULL,
  username VARCHAR(50),
  is_host BOOLEAN DEFAULT false,
  connected_at TIMESTAMP DEFAULT NOW(),
  last_seen_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(room_id, session_id)
);
```

## Key Features

**Room Management:**
- Create room with custom name and optional password
- 6-character join code (easy to share verbally)
- Room settings: max songs per user, voting enabled, auto-play
- Host controls: skip song, remove songs, kick users
- Auto-cleanup: rooms delete after 24 hours of inactivity

**Song Queue:**
- Search Spotify's library (50M+ songs)
- Real-time queue updates via WebSockets
- Visual queue with album art and vote counts
- Drag-and-drop reordering (host only)
- Song preview (30-second clips)
- Animated transitions when songs are added/removed

**Voting System:**
- Upvote/downvote songs in queue
- Songs with more votes play sooner
- One vote per user per song
- Vote count updates in real-time
- Visual indicators for voted songs

**Playback:**
- Current song display with progress bar
- Synchronized progress across all users (WebSocket sync)
- Auto-advance to next song
- Playback history
- Volume control (local only)
- For Spotify Premium users: direct playback through Spotify Web Playback SDK

**Social Features:**
- See who's in the room (avatar colors)
- See who added each song
- Chat/comments per song
- Emoji reactions to songs
- "Now playing" status for Discord/Slack integration

## API Endpoints

```javascript
// Rooms
POST   /api/rooms                    // Create new room
GET    /api/rooms/:code              // Join room by code
PUT    /api/rooms/:id/settings       // Update room settings
DELETE /api/rooms/:id                // Delete room (host only)

// Queue
GET    /api/rooms/:id/queue          // Get queue
POST   /api/rooms/:id/queue          // Add song to queue
DELETE /api/rooms/:id/queue/:songId  // Remove song (host or adder)
POST   /api/rooms/:id/queue/reorder  // Reorder queue (host only)

// Votes
POST   /api/rooms/:id/votes          // Vote on song
DELETE /api/rooms/:id/votes/:songId  // Remove vote

// Spotify
GET    /api/spotify/search           // Search Spotify catalog
GET    /api/spotify/track/:id        // Get track details

// WebSocket Events (Socket.IO)
// Client → Server
'join-room'        // Join a room
'add-song'         // Add song to queue
'vote-song'        // Vote on a song
'skip-song'        // Skip current song (host)
'update-playback'  // Update playback position

// Server → Client
'room-joined'      // Successfully joined
'queue-updated'    // Queue changed
'song-added'       // New song added
'vote-updated'     // Vote count changed
'playback-sync'    // Sync playback position
'user-joined'      // User joined room
'user-left'        // User left room
```

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/soundcircle

# Redis
REDIS_URL=redis://localhost:6379

# Spotify API
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# Server
PORT=3000
NODE_ENV=development

# JWT (for optional user accounts)
JWT_SECRET=your_jwt_secret

# Room settings
MAX_ROOM_AGE_HOURS=24
MAX_USERS_PER_ROOM=50
```

## Running Locally

### Backend
```bash
cd backend
npm install
cp .env.example .env  # Add your Spotify API credentials
npm run db:migrate    # Run database migrations
npm run dev           # Start server on :3000
```

### Frontend
```bash
cd frontend
npm install
npm run dev           # Start dev server on :5173
```

### Get Spotify API Credentials
1. Go to https://developer.spotify.com/dashboard
2. Create an app
3. Copy Client ID and Client Secret
4. Add `http://localhost:5173` to Redirect URIs

## Deployment

**Backend:** Railway (supports PostgreSQL + Redis)
**Frontend:** Vercel
**Database:** Railway PostgreSQL
**Cache/Sessions:** Railway Redis

## Challenges Solved

**Real-time Synchronization:** Multiple users voting/adding songs simultaneously can cause race conditions. Solution: Atomic database operations with transactions, and Redis-based locking for queue modifications. WebSocket broadcasts only after DB confirms success.

**Playback Sync:** Keeping playback position synchronized across all users is tricky with network latency. Solution: Server is source of truth for playback time. Sends sync events every 5 seconds. Clients adjust playback position if drift > 1 second. Host's playback position gets priority.

**Spam Prevention:** Users could spam the queue with songs. Solution: Configurable max songs per user, rate limiting on song additions (1 song per 5 seconds), and host ability to remove songs/kick users.

**Vote Manipulation:** Users could vote from multiple browsers. Solution: Session-based voting tied to Socket.IO session ID. One vote per session per song. Sessions expire after disconnect.

**Spotify API Rate Limits:** Search endpoint has rate limits. Solution: Debounced search input (300ms), Redis caching of search results (5 minutes), and server-side rate limit tracking with queue.

## What I Learned

- Real-time synchronization across multiple clients
- Handling WebSocket connection lifecycles (reconnect, disconnect, etc.)
- Implementing voting systems with race condition handling
- Spotify Web API integration and OAuth flow
- Audio playback synchronization algorithms
- Redis for session management and caching
- Database transaction handling for concurrent operations
- Building PWAs (service workers, manifest, installable)

## Tech Stack

**Backend:**
- Node.js + Express
- Socket.IO for WebSockets
- PostgreSQL (node-postgres)
- Redis (ioredis)
- Spotify Web API
- JWT for optional auth

**Frontend:**
- Vue 3 + TypeScript
- Vuex (state management)
- Socket.IO client
- Spotify Web Playback SDK
- Howler.js (audio)
- Tailwind CSS + DaisyUI
- Vite (build tool)

**Infrastructure:**
- Docker + Docker Compose
- Railway (hosting)
- GitHub Actions (CI/CD)

## Future Enhancements

- YouTube Music integration (in addition to Spotify)
- Playlist export to Spotify/Apple Music
- Recurring rooms (weekly study session, etc.)
- Room themes and customization
- Advanced voting (ranked choice, veto system)
- Analytics (most popular songs, peak hours)
- Mobile apps (React Native)
- Voice commands (Alexa/Google Home integration)
- DJ mode (host can override votes)
- Collaborative filtering (recommend songs based on room taste)

## Screenshots

[Note: In a real portfolio, add screenshots of:]
- Room creation interface
- Live queue with voting
- Song search with Spotify integration
- Mobile view at a party

## Live Demo

**Frontend:** https://soundcircle.vercel.app
**Demo Room:** Join code `DEMO01` (no password)

Try it out: Open on your phone and computer simultaneously to see real-time updates!

---

Built this after one too many arguments about what to play at parties. Now everyone gets a vote, and I can finally relax instead of DJing all night.
