import { Router } from 'express';
import availabilityController from '../controllers/AvailabilityController.js';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';

const router = Router();

// All routes require authenticated mentor
router.use(authenticateJWT, authorizeRoles('MENTOR'));

// GET  /api/mentor-availability — fetch availability windows
router.get('/', availabilityController.getMyAvailability);

// PUT  /api/mentor-availability — bulk upsert availability windows
router.put('/', availabilityController.upsertAvailability);

// DELETE /api/mentor-availability/:dayOfWeek — delete all availability for a day
router.delete('/:dayOfWeek', availabilityController.deleteDay);

export default router;
