import { prisma } from '../config/db.js';
import { WatchlistService } from '../services/watchlistService.js';
import { WatchlistController } from '../controllers/watchlistController.js';

const watchlistService = new WatchlistService(prisma);
const watchlistController = new WatchlistController(watchlistService);

export { watchlistController };