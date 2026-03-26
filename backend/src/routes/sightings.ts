// backend/src/routes/sightings.ts
import express from 'express';
import {
  getSightings,
  getSightingById,
  createSighting,
  updateSighting,
  deleteSighting,
  getStats
} from '../controllers/sightingsController.js';

const router = express.Router();

// Sightings CRUD routes
router.get('/', getSightings);           // Get all sightings
router.get('/stats', getStats);          // Get statistics
router.get('/:id', getSightingById);     // Get a sighting by id
router.post('/', createSighting);        // Create new sighting
router.put('/:id', updateSighting);      // Update a sighting
router.delete('/:id', deleteSighting);   // Delete a sighting

export default router;