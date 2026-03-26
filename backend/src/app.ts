import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import sightingsRoutes from './routes/sightings.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json());

app.use('/sightings', sightingsRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});