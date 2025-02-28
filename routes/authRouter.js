import { Router } from 'express';
const router = Router();

import { login, logoutUser, register } from '../controllers/authController.js';
import {
  validateRegisterInput,
  validateLoginInput,
} from '../middleware/validationMiddleware.js';
router.post('/login', validateLoginInput, login);
router.post('/register', validateRegisterInput, register);
router.get('/logout', logoutUser);

export default router;
