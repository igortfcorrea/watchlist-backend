import { AppError } from "../errors/AppError.js";
import { logger } from "../config/logger.js";

export const errorMiddleware = (err, req, res, next) => {
    if (err instanceof AppError) {
        logger.warn({ err, url: req.originalUrl }, err.message);
    } else {
        logger.error({ err, url: req.originalUrl }, "Unexpected error");
    }

    res.status(err.statusCode || 500).json({
        status: "error",
        message: err.message || "Internal Server Error"
    });
}