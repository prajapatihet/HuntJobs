import 'express-async-errors';
import mongoose from 'mongoose';

import * as dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

import express from 'express';
const app = express();
app.use(express.json());

// Constants
const PORT = process.env.PORT || 5100;

// Router
import jobRouter from './routes/jobRouter.js';

// Middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/v1/jobs', jobRouter);

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
  console.log(error);
  process.exit(1);
}
