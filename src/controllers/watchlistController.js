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
        next(err);
    }
};

const updateWatchlistItem = async (req, res, next) => {
    try {
        const updatedItem = await service.updateItem({ 
            id: req.params.id,
            userId: req.user.id,
            ...req.body 
        });
    
        res.status(200).json({
            status: "success",
            data: {
                watchlistItem: updatedItem
            }
        });
    } catch (err) {
        next(err);
    }
};

const removeFromWatchlist = async (req, res, next) => {
    try {
        await service.deleteItem({
            id: req.params.id,
            userId: req.user.id
        });
    
        res.status(200).json({
            status: "success",
            message: "Movie removed from watchlist"
        });
    } catch (err) {
        next(err);
    }
};

export { addToWatchlist, updateWatchlistItem, removeFromWatchlist };