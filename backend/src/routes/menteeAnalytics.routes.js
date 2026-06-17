import { Router } from 'express';
import menteeAnalyticsController from '../controllers/MenteeAnalyticsController.js';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';

const router = Router();

router.use(authenticateJWT, authorizeRoles('MENTEE'));

// GET /api/mentee-analytics — get full mentee analytics
router.get('/', menteeAnalyticsController.getAnalytics);

export default router;
