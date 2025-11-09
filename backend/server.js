const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { generateLifecycle } = require('./routes/generate-lifecycle');
const { generateStatus } = require('./routes/generate-status');
const { sendToSlack } = require('./routes/send-slack');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// CORS configuration - allow frontend to connect
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5173', // Vite default port
    'http://127.0.0.1:3000',
    'http://127.0.0.1:5173',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Request logging middleware (for debugging)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Lifecycle Copilot Backend is running' });
});

// Handle CORS preflight requests for all API routes
app.options('/api/*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(200);
});

// API Routes
app.post('/api/generate-lifecycle', generateLifecycle);
app.post('/api/generate-status', generateStatus);
app.post('/api/send-slack', sendToSlack);

// 404 handler for unknown routes (only for non-API routes to avoid confusion)
app.use((req, res, next) => {
  // Don't send 404 for OPTIONS requests (CORS preflight)
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  // For API routes that don't exist, provide helpful error
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({
      error: 'API route not found',
      path: req.path,
      method: req.method,
      hint: 'Available routes: POST /api/generate-lifecycle, POST /api/generate-status, POST /api/send-slack',
    });
  }
  
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    method: req.method,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV !== 'production';
  
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(isDevelopment && { stack: err.stack }),
  });
});

// Only start server when run directly (not when required by a serverless wrapper)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
  });
}

// Export the app for serverless wrappers (e.g., serverless-http) or tests
module.exports = app;

