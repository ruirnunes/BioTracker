import { Router } from 'express';
import {
  getSpecies,
  getSpeciesById,
  createSpecies,
  updateSpecies,
  deleteSpecies
} from '../controllers/speciesController.js';

import { auth } from '../middleware/auth.js';

const router = Router();

// Public routes
router.get('/', getSpecies);
router.get('/:id', getSpeciesById);

// Protected routes (se quiseres restringir escrita)
router.post('/', auth, createSpecies);
router.put('/:id', auth, updateSpecies);
router.delete('/:id', auth, deleteSpecies);

export default router;