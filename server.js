import 'express-async-errors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import express from 'express';
const app = express();
app.use(express.json());
app.use(cookieParser());

import * as dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Cloudinary config
import cloudinary from 'cloudinary';
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Constants
const PORT = process.env.PORT || 5100;

// Router
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';

//Public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// Middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authMiddleware } from './middleware/authMiddleware.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './public')));

app.get('/', (req, res) => {
  res.send('Hello World');
});

// app.get('/api/v1/test', (req, res) => {
//   res.json({ msg: 'test route' });
// });

app.use('/api/v1/jobs', authMiddleware, jobRouter);
app.use('/api/v1/users', authMiddleware, userRouter);
app.use('/api/v1/auth', authRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});

// Error handling for unknown routes
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling for existing routes
app.use(errorHandlerMiddleware);

try {
  await mongoose.connect(process.env.DATABASE_URL);
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
} catch (error) {
  toast;
  // console.log(error);
  process.exit(1);
}
