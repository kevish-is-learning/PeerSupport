import { Router } from 'express';
import publicMentorController from '../controllers/PublicMentorController.js';

const router = Router();

// Public — no auth required
router.get('/', publicMentorController.listMentors);
router.get('/:mentorId', publicMentorController.getMentorProfile);

export default router;

