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

router.use(auth)

// Public routes
router.get('/', getSightings);
router.get('/stats', getStats);
router.get('/:id', getSightingById);

// Protected routes
router.post('/', auth, createSighting);
router.put('/:id', auth, updateSighting);
router.delete('/:id', auth, deleteSighting);

export default router;