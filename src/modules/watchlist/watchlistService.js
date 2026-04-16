import { AppError } from "../../errors/AppError.js";
import { logger } from "../../config/logger.js";

export class WatchlistService {
    constructor(prisma) {
        this.prisma = prisma;
    };

    async addToWatchlist({ userId, movieId, status, rating, notes }) {
        // Verify movie exists
        const movie = await this.prisma.movie.findUnique({
            where: { id: movieId }
        });

        if (!movie) {
            throw new AppError("Movie not found", 404)
        }

        // Check if already added
        const existingInWatchlist = await this.prisma.watchlistItem.findUnique({
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

        const watchlistItem = this.prisma.watchlistItem.create({
            data: {
                userId: userId,
                movieId: movieId,
                status: status || "PLANNED",
                rating: rating,
                notes: notes
            }
        });

        logger.info({ watchlistItemId: watchlistItem.id }, "WatchlistItem added");
        return watchlistItem;
    }

    async updateItem({ id, userId, status, rating, notes }) {
        // Find watchlist item and verify ownership
        const watchlistItem = await this.prisma.watchlistItem.findUnique({
            where: { id: id }
        });

        if (!watchlistItem) {
            throw new AppError("Watchlist item not found", 404);
        }

        // Ensure only owner can delete
        if (watchlistItem.userId !== userId) {
            throw new AppError("Not allowed to update this watchlist item", 403);
        }

        // Build update data
        const updateData = {};
        if (status !== undefined) updateData.status = status.toUpperCase();
        if (rating !== undefined) updateData.rating = rating;
        if (notes !== undefined) updateData.notes = notes;

        // Update watchlist item
        const newWatchlistItem = this.prisma.watchlistItem.update({
            where: { id: id },
            data: updateData
        });

        logger.info({ watchlistItemId: newWatchlistItem.id }, "WatchlistItem updated");
        return newWatchlistItem
    }

    async deleteItem({ id, userId }) {
        // Find watchlist item and verify ownership
        const watchlistItem = await this.prisma.watchlistItem.findUnique({
            where: { id: id }
        });

        if (!watchlistItem) {
            throw new AppError("Watchlist item not found", 404);
        }

        // Ensure only owner can delete
        if (watchlistItem.userId !== userId) {
            throw new AppError("Not allowed to delete this watchlist item", 403);
        }

        await this.prisma.watchlistItem.delete({
            where: { id: id }
        });

        logger.info({ watchlistItemId: watchlistItem.id }, "WatchlistItem deleted");
    }
}