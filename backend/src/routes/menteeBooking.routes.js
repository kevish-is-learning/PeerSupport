import { Router } from 'express';

import menteeBookingController from '../controllers/MenteeBookingController.js';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.use(authenticateJWT, authorizeRoles('MENTEE'));

router.get('/my-sessions', menteeBookingController.getMySessions);

export default router;
