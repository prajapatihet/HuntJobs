import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import { nanoid } from 'nanoid';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5100;

// Router
import jobRouter from './routes/jobRouter.js';

if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"))
}
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/api/v1/jobs', jobRouter);

// Error handling for unknown routes
app.use("*", (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Error handling for existing routes
app.use((error, req, res, next) => {
    res.status(500).json({ error: error.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});