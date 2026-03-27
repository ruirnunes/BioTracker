import { Router } from 'express';
import { auth } from '../middleware/auth.js';

import {
  getMe,
  updateMe,
  getUserStats
} from '../controllers/userController.js';

const router = Router();

// All routes require authentication
router.use(auth);

// Get current user profile
router.get('/me', getMe);

// Update current user profile
router.put('/me', updateMe);

// Get user stats (sightings count)
router.get('/me/stats', getUserStats);

export default router;