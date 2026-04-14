import express from 'express';

import { validateRequest } from "../../middlewares/validateRequest.js";
import { registerSchema, loginSchema } from '../../validators/authValidators.js';

import { authController } from '../../di/authContainer.js';

const router = express.Router();

router.post("/register", validateRequest(registerSchema), authController.register);

router.post("/login", validateRequest(loginSchema), authController.login);

router.post("/logout", authController.logout);

export default router;