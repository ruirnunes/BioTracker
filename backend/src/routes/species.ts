import { Router } from 'express';
import {
  getSpecies,
  getSpeciesById,
  createSpecies,
  updateSpecies,
  deleteSpecies
} from '../controllers/speciesController.js';

import { auth } from '../middleware/auth.js';
import supabase from '../supabaseClient.js';

const router = Router();

// SEARCH + FILTER
router.get('/search', async (req, res) => {
  const { q, type } = req.query;

  let query = supabase.from('species').select('*');

  // search by name
  if (q && typeof q === 'string') {
    query = query.ilike('common_name', `%${q}%`);
  }

  // filter by type
  if (type && typeof type === 'string') {
    query = query.eq('type', type);
  }

  const { data, error } = await query.order('common_name', { ascending: true });

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

// Public routes
router.get('/', getSpecies);
router.get('/:id', getSpeciesById);

// Protected routes
router.post('/', auth, createSpecies);
router.put('/:id', auth, updateSpecies);
router.delete('/:id', auth, deleteSpecies);

export default router;