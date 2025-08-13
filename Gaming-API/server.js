import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import './src/db.js'; // Connect to MongoDB

// Import routes
import authRouter from './src/routes/auth.routes.js';
import scoreRouter from './src/routes/score.routes.js';
import leaderboardRouter from './src/routes/leaderboardroutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Default route
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Gaming API is running',
    endpoints: {
      auth: {
        register: 'POST /register',
        login: 'POST /login'
      },
      scores: {
        getScores: 'GET /scores',
        addScore: 'POST /scores'
      },
      leaderboard: {
        getLeaderboard: 'GET /leaderboard',
        addToLeaderboard: 'POST /leaderboard'
      }
    },
    note: 'All endpoints except auth require x-api-key header'
  });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api', scoreRouter);
app.use('/api', leaderboardRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ success: false, message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📋 API Documentation available at http://localhost:${PORT}`);
});
