import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config();

import { nanoid } from 'nanoid';

const app = express();
const PORT = process.env.PORT || 5100;

let jobs = [
    { id: nanoid(), company: 'apple', position: 'front-end' },
    { id: nanoid(), company: 'google', position: 'back-end' },
]

if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev"))
}
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/', (req, res) => {
    console.log(req);
    res.json({ message: 'data received', data: req.body });
});

app.get('/api/v1/jobs', (req, res) => {
    res.status(200).json({
        jobs
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);

});