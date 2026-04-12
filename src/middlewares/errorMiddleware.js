export const errorMiddleware = (err, req, res, next) => {
    console.log(err);

    res.status(err.statusCode || 500).json({
        status: "error",
        message: err.message || "Internal Server Error"
    });
}