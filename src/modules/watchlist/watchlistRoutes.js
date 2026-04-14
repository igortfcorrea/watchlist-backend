import express from "express";

import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { addToWatchlistSchema, updateWatchlistSchema, removeFromWatchlistSchema } from "../../validators/watchlistValidators.js";

import { watchlistController } from "../../di/watchlistContainer.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateRequest(addToWatchlistSchema), watchlistController.addToWatchlist);

router.put("/:id", validateRequest(updateWatchlistSchema), watchlistController.updateWatchlistItem);

router.delete("/:id", validateRequest(removeFromWatchlistSchema), watchlistController.removeFromWatchlist);

export default router;