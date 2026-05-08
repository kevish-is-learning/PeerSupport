import { Router } from 'express';

import mentorServiceController from '../controllers/MentorServiceController.js';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';

const router = Router();

// Public: fetch available service types (catalogue)
router.get('/types', mentorServiceController.getServiceTypes);

// Protected: mentor-only CRUD
router.use(authenticateJWT, authorizeRoles('MENTOR'));

router.get('/', mentorServiceController.getMyServices);
router.put('/', mentorServiceController.upsertServices);
router.delete('/:serviceType', mentorServiceController.deleteService);

export default router;
