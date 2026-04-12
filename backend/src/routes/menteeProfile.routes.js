import { Router } from 'express';

import menteeProfileController from '../controllers/MenteeProfileController.js';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.use(authenticateJWT, authorizeRoles('MENTEE'));

router.get('/', menteeProfileController.getMyProfile);
router.post('/', menteeProfileController.createMyProfile);
router.put('/', menteeProfileController.updateMyProfile);
router.delete('/', menteeProfileController.deleteMyProfile);

export default router;
