import { Router } from 'express';

import mentorProfileController from '../controllers/MentorProfileController.js';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';
import { mentorProfileUpload } from '../middleware/upload.js';

const router = Router();

router.use(authenticateJWT, authorizeRoles('MENTOR'));

router.get('/', mentorProfileController.getMyProfile);
router.post('/', mentorProfileUpload, mentorProfileController.createMyProfile);
router.put('/', mentorProfileUpload, mentorProfileController.updateMyProfile);
router.delete('/', mentorProfileController.deleteMyProfile);

export default router;
