import { Router } from 'express';
import publicMenteeController from '../controllers/PublicMenteeController.js';

const router = Router();

// Public — no auth required (or could require auth if we want only logged in users)
// Currently making it public so mentors can easily view it.
router.get('/:menteeId', publicMenteeController.getMenteeProfile);

export default router;
