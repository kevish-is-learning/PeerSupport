import { Router } from 'express';
import availabilityController from '../controllers/AvailabilityController.js';
import { authenticateJWT, authorizeRoles, requireApprovedMentor } from '../middleware/auth.js';

const router = Router();

// All routes require authenticated mentor
router.use(authenticateJWT, authorizeRoles('MENTOR'), requireApprovedMentor);

// GET  /api/mentor-availability — fetch availability windows
router.get('/', availabilityController.getMyAvailability);

// PUT  /api/mentor-availability — bulk upsert availability windows
router.put('/', availabilityController.upsertAvailability);

// DELETE /api/mentor-availability/date/:date — delete all availability for a date
router.delete('/date/:date', availabilityController.deleteDate);

export default router;
