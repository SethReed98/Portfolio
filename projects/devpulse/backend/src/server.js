const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { createServer } = require('http');
const { Server } = require('socket.io');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const activityRoutes = require('./routes/activity');
const integrationRoutes = require('./routes/integrations');
const profileRoutes = require('./routes/profile');

const { initializeRedis } = require('./utils/redis');
const { startActivityPoll } = require('./jobs/activityPoller');
const { authenticateSocket } = require('./middleware/socketAuth');

const app = express();
const httpServer = createServer(app);

// Initialize Socket.IO with CORS
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
  }
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/integrations', integrationRoutes);
app.use('/api/profile', profileRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Socket.IO connection handling
io.use(authenticateSocket);

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.user.id}`);

  // Join user-specific room for targeted updates
  socket.join(`user:${socket.user.id}`);

  // Send initial connection confirmation
  socket.emit('connected', {
    message: 'Connected to DevPulse real-time updates',
    userId: socket.user.id
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.user.id}`);
  });
});

// Make io accessible to routes
app.set('io', io);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal server error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 5000;

// Initialize services and start server
async function startServer() {
  try {
    // Initialize Redis connection
    await initializeRedis();
    console.log('✓ Redis connected');

    // Start background job for polling APIs
    startActivityPoll(io);
    console.log('✓ Activity polling started');

    // Start HTTP server
    httpServer.listen(PORT, () => {
      console.log(`✓ Server running on port ${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing server gracefully');
  httpServer.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

module.exports = { app, io };
