import express from 'express';
import cors from 'cors';

import { errorMiddleware } from './middlewares/errorMiddleware.js';
import { AppError } from './errors/AppError.js';

import authRoutes from './modules/auth/authRoutes.js';
import watchlistRoutes from './modules/watchlist/watchlistRoutes.js';

const app = express();

// CORS
app.use(cors());

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/auth', authRoutes);
app.use('/watchlist', watchlistRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// 404 handler
app.use((req, res, next) => {
  next(new AppError(`Route ${req.originalUrl} not found`, 404));
});

// Error handler — always last
app.use(errorMiddleware);

export { app };