import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import sightingsRoutes from './routes/sightings.js';
import speciesRoutes from './routes/species.js';
import usersRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/sightings', sightingsRoutes);
app.use('/species', speciesRoutes);
app.use('/users', usersRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});