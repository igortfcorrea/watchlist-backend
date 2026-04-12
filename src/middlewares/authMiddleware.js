import jwt from "jsonwebtoken";
import { prisma } from "../config/db.js";

// Read the token from the request and check if it's valid
export const authMiddleware = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1]; // ["Bearer", "token_value"]
    } else if (req.cookies?.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        return res.status(401).json({ error: "Not authorized, no token provided" });
    }

    try {
        // Verify token and extract user id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await prisma.user.findUnique({
            where: { id: decoded.id }
        });

        if (!user) {
            return res.status(401).json({ error: "User no longer exists" });
        }
    
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Not authorized, token failed" });
    }
}