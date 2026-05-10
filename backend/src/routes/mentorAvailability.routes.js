import { Router } from 'express';
import availabilityController from '../controllers/AvailabilityController.js';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';

const router = Router();

// All routes require authenticated mentor
router.use(authenticateJWT, authorizeRoles('MENTOR'));

// GET  /api/mentor-availability — fetch weekly availability with slots + services
router.get('/', availabilityController.getMyAvailability);

// PUT  /api/mentor-availability — bulk upsert entire week (days + slots + service mappings)
router.put('/', availabilityController.upsertAvailability);

// POST /api/mentor-availability/:dayId/slots — add a single slot to a day
router.post('/:dayId/slots', availabilityController.addSlot);

// PUT  /api/mentor-availability/slots/:slotId — update a slot
router.put('/slots/:slotId', availabilityController.updateSlot);

// DELETE /api/mentor-availability/slots/:slotId — delete a single slot
router.delete('/slots/:slotId', availabilityController.deleteSlot);

// DELETE /api/mentor-availability/:dayOfWeek — delete all availability for a day
router.delete('/:dayOfWeek', availabilityController.deleteDay);

export default router;
