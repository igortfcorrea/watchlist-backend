import 'dotenv/config';
import { app } from './app.js';
import { env } from './config/env.js';
import { connectDB, disconnectDB } from './config/db.js';

const startServer = async () => {
  await connectDB();

  const server = app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT} [${env.NODE_ENV}]`);
  });

  // Graceful shutdown helper
  const shutdown = async (signal, err) => {
    if (err) console.error(signal, err);
    else console.log(`${signal} received, shutting down gracefully`);

    server.close(async () => {
      await disconnectDB();
      process.exit(err ? 1 : 0);
    });
  };

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => shutdown('unhandledRejection', err));

  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => shutdown('uncaughtException', err));

  // Graceful shutdown on SIGTERM (e.g. Docker, cloud platforms)
  process.on('SIGTERM', () => shutdown('SIGTERM'));

  // Graceful shutdown on SIGINT (e.g. Ctrl+C locally)
  process.on('SIGINT', () => shutdown('SIGINT'));              // 👈 was missing
};

startServer();