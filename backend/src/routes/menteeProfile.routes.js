import { Router } from 'express';

import menteeProfileController from '../controllers/MenteeProfileController.js';
import { authenticateJWT, authorizeRoles } from '../middleware/auth.js';
import { menteeProfileUpload } from '../middleware/upload.js';

const router = Router();

router.use(authenticateJWT, authorizeRoles('MENTEE'));

router.get('/', menteeProfileController.getMyProfile);
router.post('/', menteeProfileUpload, menteeProfileController.createMyProfile);
router.put('/', menteeProfileUpload, menteeProfileController.updateMyProfile);
router.delete('/', menteeProfileController.deleteMyProfile);

export default router;
