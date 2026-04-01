import { Router } from 'express';
import { auth } from '../middleware/auth.js';

import {
  getMe,
  updateMe,
  getUserStats
} from '../controllers/userController.js';

const router = Router();

/**
 * All routes below require authentication
 */
router.use(auth);

/**
 * Get current authenticated user profile
 */
router.get('/me', getMe);

/**
 * Update current authenticated user profile
 */
router.put('/me', updateMe);

/**
 * Get statistics for current user (sightings, species, etc.)
 */
router.get('/me/stats', getUserStats);

export default router;