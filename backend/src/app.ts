// backend/src/app.ts
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import sightingsRoutes from './routes/sightings.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from root
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(express.json());

// Register routes
app.use('/sightings', sightingsRoutes);

// Start server
app.listen(3000, () => console.log('Backend running on port 3000'));