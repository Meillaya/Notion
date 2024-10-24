import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth';
import { setupDatabase } from './db/setup';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Setup database tables
setupDatabase();

// Routes
app.use('/api/auth', authRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});