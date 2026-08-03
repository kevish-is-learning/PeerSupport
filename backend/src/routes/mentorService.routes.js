import { Router } from 'express';

import mentorServiceController from '../controllers/MentorServiceController.js';
import { authenticateJWT, authorizeRoles, requireApprovedMentor } from '../middleware/auth.js';

const router = Router();

// Public: fetch available service types (catalogue)
router.get('/types', mentorServiceController.getServiceTypes);

// Protected: mentor-only CRUD
router.use(authenticateJWT, authorizeRoles('MENTOR'), requireApprovedMentor);

router.get('/', mentorServiceController.getMyServices);
router.post('/', mentorServiceController.createService);
router.put('/:id', mentorServiceController.updateService);
router.patch('/:id/toggle', mentorServiceController.toggleActive);
router.delete('/:id', mentorServiceController.deleteService);

export default router;
