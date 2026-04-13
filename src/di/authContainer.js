import bcrypt from 'bcryptjs';
import { prisma } from '../config/db.js';
import { AuthService } from '../services/authService.js';
import { AuthController } from '../controllers/authController.js';

const authService = new AuthService(prisma, bcrypt);
const authController = new AuthController(authService);

export { authController };