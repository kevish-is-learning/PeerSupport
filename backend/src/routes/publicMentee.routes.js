import { Router } from 'express';
import publicMenteeController from '../controllers/PublicMenteeController.js';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';

const router = Router();

// Mentee profiles include sensitive personal information and are visible only
// to an admin or a mentor with a booking relationship to that mentee.
router.get('/:menteeId', authenticateJWT, authorizeRoles('MENTOR', 'ADMIN'), publicMenteeController.getMenteeProfile);

export default router;
