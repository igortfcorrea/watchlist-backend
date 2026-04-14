import { z } from "zod";

const watchlistStatus = z.enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
    error: () => ({ message: "Status must be one of: PLANNED, WATCHING, COMPLETED, DROPPED" })
});
  
const watchlistFields = {
    movieId: z.string().uuid(),
    status: watchlistStatus.optional(),
    rating: z.int("Rating must be an integer").min(1).max(10).optional(),
    notes: z.string().optional()
};
  
const addToWatchlistSchema = z.object({
    body: z.object({
        movieId: watchlistFields.movieId,
        status: watchlistFields.status,
        rating: watchlistFields.rating,
        notes: watchlistFields.notes,
    })
});
  
const updateWatchlistSchema = z.object({
    params: z.object({
        id: z.string().uuid("Invalid watchlist item ID")
    }),
    body: z.object({
        status: watchlistFields.status,
        rating: watchlistFields.rating,
        notes: watchlistFields.notes,
    }).refine(
        (data) => Object.values(data).some((v) => v !== undefined),
        { message: "At least one field must be provided to update" }
    )
});

const removeFromWatchlistSchema = z.object({
    params: z.object({
        id: z.string().uuid("Invalid watchlist item ID")
    })
});

export { addToWatchlistSchema, updateWatchlistSchema, removeFromWatchlistSchema };