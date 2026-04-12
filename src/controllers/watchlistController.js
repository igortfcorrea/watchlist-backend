import { prisma } from "../config/db.js";
import { WatchlistService } from "../services/watchlistService.js";

const service = new WatchlistService();

const addToWatchlist = async (req, res, next) => {
    try {
        const watchlistItem = await service.addToWatchlist({
            userId: req.user.id,
            ...req.body
        });

        res.status(201).json({
            status: "success",
            data: { watchlistItem }
        });
    } catch (err) {
        next(err)
    }
};

const updateWatchlistItem = async (req, res) => {
    const { status, rating, notes } = req.body;

    // Find watchlist item and verify ownership
    const watchlistItem = await prisma.watchlistItem.findUnique({
        where: { id: req.params.id }
    });

    if (!watchlistItem) {
        return res.status(404).json({ error: "Watchlist item not found" });
    }

    // Ensure only owner can delete
    if (watchlistItem.userId !== req.user.id) {
        return res.status(403).json({ error: "Not allowed to update this watchlist item" });
    }

    // Build update data
    const updateData = {};
    if (status !== undefined) updateData.status = status.toUpperCase();
    if (rating !== undefined) updateData.rating = rating;
    if (notes !== undefined) updateData.notes = notes;

    // Update watchlist item
    const updatedItem = await prisma.watchlistItem.update({
        where: { id: req.params.id },
        data: updateData
    });

    res.status(200).json({
        status: "success",
        data: {
            watchlistItem: updatedItem
        }
    });
};

const removeFromWatchlist = async (req, res) => {
    // Find watchlist item and verify ownership
    const watchlistItem = await prisma.watchlistItem.findUnique({
        where: { id: req.params.id }
    });

    if (!watchlistItem) {
        return res.status(404).json({ error: "Watchlist item not found" });
    }

    // Ensure only owner can delete
    if (watchlistItem.userId !== req.user.id) {
        return res.status(403).json({ error: "Not allowed to delete this watchlist item" });
    }

    await prisma.watchlistItem.delete({
        where: { id: req.params.id }
    });

    res.status(200).json({
        status: "success",
        message: "Movie removed from watchlist"
    });
};

export { addToWatchlist, updateWatchlistItem, removeFromWatchlist };