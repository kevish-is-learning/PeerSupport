import { Router } from 'express';

import menteeDashboardController from '../controllers/MenteeDashboardController.js';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.use(authenticateJWT, authorizeRoles('MENTEE'));

router.get('/', menteeDashboardController.getDashboardData);

export default router;
