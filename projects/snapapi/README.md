# SnapAPI - Visual API Testing Tool

API testing tool that actually shows you what the response looks like, not just raw JSON. Because sometimes you need to see the damn image your API is supposed to return.

## The Problem

Traditional API testing tools (Postman, Insomnia) are great for JSON APIs but terrible for anything visual. Testing an endpoint that returns an image? You get base64 text. SVG? Just XML. File download? Hope you like copying bytes. There's no good way to:
- Visualize image/media responses
- Preview HTML/PDF responses
- Test WebSocket connections visually
- Share test collections with non-technical team members (designers, PMs)
- See response diffs when debugging API changes

## My Solution

Built a full-stack API testing tool with visual response rendering. Backend proxy handles CORS issues and stores test collections/history in MongoDB. Frontend renders responses based on content type - images display as images, PDFs open in viewer, HTML renders live, JSON gets syntax highlighting with collapsible sections. Added real-time WebSocket testing with message history, and team collaboration features so designers can see actual API responses without touching Postman.

## Impact

- **Visual response rendering:** Automatically detects content type and renders appropriately
- **20+ content types supported:** JSON, XML, HTML, Images, PDFs, SVGs, CSV, etc.
- **WebSocket testing:** Real-time connection testing with message history and auto-reconnect
- **Response diffing:** Visual diff between two API responses (great for debugging)
- **Team collections:** Share test collections with team via shareable links
- **Environment variables:** Switch between dev/staging/production with one click
- **Request history:** Automatically saves last 100 requests per collection
- **Code generation:** Export tests as cURL, fetch(), axios, Python requests

## Technical Architecture

### Backend (Python + Flask)
- Flask REST API for proxy and data storage
- MongoDB for storing collections, environments, history
- JWT authentication
- CORS proxy to handle cross-origin requests
- File handling for multipart/form-data
- WebSocket proxy server (Flask-SocketIO)
- Response caching with Redis

### Frontend (React + TypeScript)
- React + TypeScript + Vite
- Monaco Editor for request bodies (same as VS Code)
- React-diff-viewer for response comparison
- PDF.js for PDF preview
- SVG renderer with pan/zoom
- WebSocket client with auto-reconnect
- IndexedDB for offline request history
- Tailwind CSS for styling

### Database Schema

```javascript
// Collections
{
  _id: ObjectId,
  name: String,
  description: String,
  owner_id: ObjectId,
  shared: Boolean,
  share_token: String,
  environments: [{
    name: String,
    variables: Map<String, String>
  }],
  folders: [{
    name: String,
    requests: [Request]
  }],
  created_at: Date,
  updated_at: Date
}

// Requests
{
  _id: ObjectId,
  name: String,
  method: String, // GET, POST, etc.
  url: String,
  headers: Map<String, String>,
  body: Object,
  tests: String, // JavaScript test code
  folder_id: ObjectId
}

// History
{
  _id: ObjectId,
  user_id: ObjectId,
  request_id: ObjectId,
  request_data: Object,
  response_data: Object,
  response_time: Number,
  status_code: Number,
  timestamp: Date
}
```

## Key Features

**Visual Response Rendering:**
- **Images:** PNG, JPG, GIF, WebP display as actual images with zoom
- **PDFs:** Embedded PDF viewer with page navigation
- **SVGs:** Rendered with pan/zoom controls
- **HTML:** Live preview with sandbox (won't execute scripts)
- **Videos:** MP4/WebM playback with controls
- **Audio:** Waveform visualization
- **JSON:** Syntax highlighting + collapsible tree view
- **XML:** Formatted and syntax highlighted
- **CSV:** Rendered as sortable data table

**Request Building:**
- Monaco editor for JSON/XML bodies (autocomplete, validation)
- Form data builder for multipart uploads
- Binary file uploads
- GraphQL query builder
- URL parameter builder
- Header templates (common auth patterns)

**Testing & Automation:**
- JavaScript test assertions (similar to Postman)
- Pre-request scripts
- Collection runner (run all requests in sequence)
- Environment variables with {{variable}} syntax
- Response data extraction (save to variables)

**Collaboration:**
- Share collections via unique URLs
- Real-time collaboration (see team members' cursors)
- Comment threads on requests
- Activity feed (who changed what)
- Role-based permissions (view/edit/admin)

**Advanced Features:**
- Response diff viewer (compare two responses side-by-side)
- WebSocket testing (connect, send, receive with history)
- SSE (Server-Sent Events) streaming
- Mock server (return saved responses)
- Request chaining (use response from one request in another)
- Code generation for 10+ languages

## API Endpoints

```python
# Authentication
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/verify

# Collections
GET    /api/collections              # List user's collections
POST   /api/collections              # Create collection
GET    /api/collections/:id          # Get collection
PUT    /api/collections/:id          # Update collection
DELETE /api/collections/:id          # Delete collection
POST   /api/collections/:id/share    # Generate share link

# Requests
POST   /api/collections/:id/requests      # Add request to collection
PUT    /api/collections/:id/requests/:rid # Update request
DELETE /api/collections/:id/requests/:rid # Delete request

# Proxy (handles actual API calls)
POST   /api/proxy                    # Proxy any HTTP request
WS     /api/ws/proxy                 # WebSocket proxy

# History
GET    /api/history                  # Get request history
GET    /api/history/:id              # Get specific history entry
```

## Environment Variables

```env
# MongoDB
MONGO_URI=mongodb://localhost:27017/snapapi

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your_secret_key

# Server
PORT=5000
FLASK_ENV=development

# CORS
ALLOWED_ORIGINS=http://localhost:5173
```

## Running Locally

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Database
```bash
# Install MongoDB
# Start MongoDB service
mongod --dbpath ./data

# Create database and collections
python backend/scripts/init_db.py
```

## Deployment

**Backend:** Deployed on Render (supports Python + MongoDB)
**Frontend:** Deployed on Vercel
**Database:** MongoDB Atlas (free tier)
**Cache:** Upstash Redis (free tier)

## Challenges Solved

**CORS Proxy:** Can't make direct API calls from browser to many APIs due to CORS. Solution: Backend proxy that forwards requests and handles CORS headers properly. Also handles authentication credentials securely without exposing them to frontend.

**Large Response Handling:** Some APIs return multi-MB responses that freeze the browser. Solution: Streaming response parsing with Web Workers, and automatic response truncation with "View Full Response" option.

**Content Type Detection:** APIs don't always set correct Content-Type headers. Solution: Smart detection using response content (magic numbers for images, DOCTYPE for HTML, etc.) with manual override option.

**WebSocket Proxy:** Can't proxy WebSocket connections through regular HTTP proxy. Solution: Separate WebSocket server that maintains connection mapping and forwards messages bidirectionally.

## What I Learned

- Building a robust proxy server (handling redirects, cookies, auth)
- Content-type detection and response streaming
- WebSocket bidirectional communication and connection management
- PDF.js integration for document preview
- Monaco editor integration (VS Code's editor as React component)
- IndexedDB for offline-first features
- Implementing visual diff algorithms
- Handling binary data in web apps

## Tech Stack

**Backend:**
- Python + Flask
- MongoDB (PyMongo)
- Flask-SocketIO for WebSockets
- Redis for caching
- JWT for authentication

**Frontend:**
- React + TypeScript
- Monaco Editor (code editor)
- PDF.js (PDF viewer)
- React-diff-viewer (response comparison)
- Recharts (analytics charts)
- Tailwind CSS
- IndexedDB (dexie.js)

**Infrastructure:**
- Docker + Docker Compose
- Nginx (reverse proxy)
- GitHub Actions (CI/CD)

## Future Enhancements

- GraphQL schema introspection and autocomplete
- gRPC testing support
- Load testing (send N requests and show analytics)
- Response mocking/stubbing
- OpenAPI/Swagger import
- Automated API documentation generation
- Mobile app (React Native)
- VS Code extension
- CLI tool for CI/CD integration

## Screenshots

[Note: In a real portfolio, add screenshots of:]
- Visual response rendering (image, PDF, JSON)
- WebSocket testing interface
- Response diff viewer
- Collection management

## Live Demo

**Frontend:** https://snapapi.vercel.app
**Demo collection:** Import this URL to try it out:
`https://snapapi.vercel.app/share/demo-jsonplaceholder`

---

Built this because I was tired of testing image APIs and seeing base64 strings. Sometimes you just want to see if the damn endpoint is returning the right picture.
