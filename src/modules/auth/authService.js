import { AppError } from "../../errors/AppError.js";
import { logger } from "../../config/logger.js";

export class AuthService {
    constructor(prisma, bcrypt) {
        this.prisma = prisma;
        this.bcrypt = bcrypt;
    };

    async register({ name, email, password }) {
        // Check if user already exists
        const userExists = await this.prisma.user.findUnique({
            where: { email: email }
        });

        if (userExists) {
            throw new AppError("User already exists with this email", 400)
        }

        // Hash Password
        const salt = await this.bcrypt.genSalt(10);
        const hashedPassword = await this.bcrypt.hash(password, salt);

        // Create User
        const user = await this.prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        });

        logger.info({ userId: user.id }, "User registered");
        return user;
    }

    async login({ email, password }) {
        // Check if user email exists
        const user = await this.prisma.user.findUnique({
            where: { email: email }
        });

        if (!user) {
            throw new AppError("Invalid email or password", 401)
        }

        // Verify Password
        const isPasswordValid = await this.bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new AppError("Invalid email or password", 401)
        }

        logger.info({ userId: user.id }, "User logged-in");
        return user;
    }
}