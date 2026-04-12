import { prisma } from "../config/db.js";
import bcrypt from 'bcryptjs';
import { AppError } from "../errors/AppError.js";

export class AuthService {
    async register({ name, email, password }) {
        // Check if user already exists
        const userExists = await prisma.user.findUnique({
            where: { email: email }
        });

        if (userExists) {
            throw new AppError("User already exists with this email", 400)
        }

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create User
        return await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        });
    }

    async login({ email, password }) {
        // Check if user email exists
        const user = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!user) {
            throw new AppError("Invalid email or password", 401)
        }

        // Verify Password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new AppError("Invalid email or password", 401)
        }

        return user;
    }
}