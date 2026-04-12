import { Router } from 'express';

import adminMentorController from '../controllers/AdminMentorController.js';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.use(authenticateJWT, authorizeRoles('ADMIN'));

router.get('/mentor-waitlist', adminMentorController.listWaitlist);
router.patch('/mentor-waitlist/:profileId', adminMentorController.updateApproval);

export default router;
