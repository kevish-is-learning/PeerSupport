import { Router } from 'express';

import mentorAvailabilityController from '../controllers/MentorAvailabilityController.js';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';

const router = Router();

// All routes require authenticated mentor
router.use(authenticateJWT, authorizeRoles('MENTOR'));

router.get('/', mentorAvailabilityController.getMyAvailability);
router.put('/', mentorAvailabilityController.upsertAvailability);
router.delete('/:dayOfWeek', mentorAvailabilityController.deleteDay);

export default router;
