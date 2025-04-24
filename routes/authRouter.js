import { Router } from 'express';
const router = Router();

import { login, logoutUser, register } from '../controllers/authController.js';
import {
  validateRegisterInput,
  validateLoginInput,
} from '../middleware/validationMiddleware.js';

// import rateLimiter from 'express-rate-limit';

// const apiLimiter = rateLimiter({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 15,
//   message: { msg: 'IP rate limit exceeded, retry in 15 minutes.' },
// });

router.post('/login', validateLoginInput, login);
router.post('/register', validateRegisterInput, register);
router.get('/logout', logoutUser);

export default router;
