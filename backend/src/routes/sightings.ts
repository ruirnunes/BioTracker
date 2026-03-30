import express from 'express';
import {
  getSightings,
  getSightingById,
  createSighting,
  updateSighting,
  deleteSighting,
  getStats
} from '../controllers/sightingsController.js';

import { auth } from '../middleware/auth.js';

const router = express.Router();

// Apply auth to all routes
router.use(auth);

// GET all sightings (only logged user)
router.get('/', getSightings);

// GET stats
router.get('/stats', getStats);

// GET one sighting
router.get('/:id', getSightingById);

// CREATE
router.post('/', createSighting);

// UPDATE (no need for auth again)
router.put('/:id', updateSighting);

// DELETE (no need for auth again)
router.delete('/:id', deleteSighting);

export default router;