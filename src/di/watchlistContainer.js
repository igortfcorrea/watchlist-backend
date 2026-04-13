import { prisma } from '../config/db.js';
import { WatchlistService } from '../modules/watchlist/watchlistService.js';
import { WatchlistController } from '../modules/watchlist/watchlistController.js';

const watchlistService = new WatchlistService(prisma);
const watchlistController = new WatchlistController(watchlistService);

export { watchlistController };