/**
 * V2 Mentor Routes
 *
 * All routes are prefixed with /api/v2
 *
 * GET   /services                — list all seeded services (public)
 * GET   /mentor/services         — get mentor's configured services (auth + MENTOR)
 * PUT   /mentor/services         — upsert mentor service config (auth + MENTOR)
 * GET   /mentor/availability     — get mentor's availability windows (auth + MENTOR)
 * PUT   /mentor/availability     — upsert availability windows (auth + MENTOR)
 */

import { Router } from 'express';
import mentorController from '../../controllers/v2/MentorController.js';
import { authenticateJWT, authorizeRoles } from '../../middleware/auth.js';

const router = Router();

// ─── Public ──────────────────────────────────────────────────────────────────

// Service catalogue (public)
router.get('/services', mentorController.getAllServices);

// ─── Authenticated Mentor ────────────────────────────────────────────────────

// Mentor service configuration
router.get(
  '/mentor/services',
  authenticateJWT,
  authorizeRoles('MENTOR'),
  mentorController.getMentorServices
);

router.put(
  '/mentor/services',
  authenticateJWT,
  authorizeRoles('MENTOR'),
  mentorController.upsertMentorServices
);

// Mentor availability windows
router.get(
  '/mentor/availability',
  authenticateJWT,
  authorizeRoles('MENTOR'),
  mentorController.getAvailability
);

router.put(
  '/mentor/availability',
  authenticateJWT,
  authorizeRoles('MENTOR'),
  mentorController.upsertAvailability
);

export default router;
