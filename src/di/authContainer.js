import bcrypt from 'bcryptjs';
import { prisma } from '../config/db.js';
import { AuthService } from '../modules/auth/authService.js';
import { AuthController } from '../modules/auth/authController.js';

const authService = new AuthService(prisma, bcrypt);
const authController = new AuthController(authService);

export { authController };