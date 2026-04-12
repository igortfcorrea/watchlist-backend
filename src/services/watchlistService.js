import { prisma } from "../config/db.js";
import { AppError } from "../errors/AppError.js";

export class WatchlistService {
    async addToWatchlist({ userId, movieId, status, rating, notes }) {
        // Verify movie exists
        const movie = await prisma.movie.findUnique({
            where: { id: movieId }
        });

        if (!movie) {
            throw new AppError("Movie not found", 404)
        }

        // Check if already added
        const existingInWatchlist = await prisma.watchlistItem.findUnique({
            where: { 
                userId_movieId: {
                    userId: userId,
                    movieId: movieId
                } 
            }
        });

        if (existingInWatchlist) {
            throw new AppError("Movie already in the watchlist", 400);
        }

        return prisma.watchlistItem.create({
            data: {
                userId: userId,
                movieId: movieId,
                status: status || "PLANNED",
                rating: rating,
                notes: notes
            }
        });
    }
}