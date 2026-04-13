export class WatchlistController {
    constructor(watchlistService) {
        this.service = watchlistService;
    };

    addToWatchlist = async (req, res, next) => {
        try {
            const watchlistItem = await this.service.addToWatchlist({
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

    updateWatchlistItem = async (req, res, next) => {
        try {
            const updatedItem = await this.service.updateItem({ 
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

    removeFromWatchlist = async (req, res, next) => {
        try {
            await this.service.deleteItem({
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
}